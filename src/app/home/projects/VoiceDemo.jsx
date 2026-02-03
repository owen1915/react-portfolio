"use client";

import { useState, useRef, useEffect } from "react";
import * as ort from "onnxruntime-web";

// Audio processing constants (must match training)
const TARGET_SAMPLE_RATE = 16000;
const N_MFCC = 40;
const N_FFT = 2048;
const HOP_LENGTH = 512;
const SEGMENT_DURATION = 3.0;
const SEGMENT_SAMPLES = TARGET_SAMPLE_RATE * SEGMENT_DURATION;

// Labels
const AGE_LABELS = ['teens', 'twenties', 'thirties', 'fourties', 'fifties', 'sixties', 'seventies', 'eighties', 'nineties'];
const GENDER_LABELS = ['male', 'female', 'other'];

export default function VoiceDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);

  const sessionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioContextRef = useRef(null);

  // Load ONNX model on mount
  useEffect(() => {
    loadModel();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const loadModel = async () => {
    try {
      setIsModelLoading(true);
      setError(null);

      // Configure ONNX Runtime for WebAssembly
      ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

      sessionRef.current = await ort.InferenceSession.create('/models/voice_classifier.onnx', {
        executionProviders: ['wasm'],
      });

      setIsModelLoading(false);
    } catch (err) {
      console.error('Failed to load model:', err);
      setError('Failed to load AI model. Please refresh the page.');
      setIsModelLoading(false);
    }
  };

  const formatAge = (label) => {
    const formatted = {
      'teens': 'Teens (13-19)',
      'twenties': '20s',
      'thirties': '30s',
      'fourties': '40s',
      'fifties': '50s',
      'sixties': '60s',
      'seventies': '70s',
      'eighties': '80s',
      'nineties': '90s',
    };
    return formatted[label] || label;
  };

  // DCT-II implementation for MFCC
  const dctII = (signal) => {
    const N = signal.length;
    const result = new Float32Array(N);
    for (let k = 0; k < N; k++) {
      let sum = 0;
      for (let n = 0; n < N; n++) {
        sum += signal[n] * Math.cos((Math.PI / N) * (n + 0.5) * k);
      }
      result[k] = sum;
    }
    return result;
  };

  // Mel filterbank creation
  const hzToMel = (hz) => 2595 * Math.log10(1 + hz / 700);
  const melToHz = (mel) => 700 * (Math.pow(10, mel / 2595) - 1);

  const createMelFilterbank = (numFilters, nfft, sampleRate) => {
    const lowFreq = 0;
    const highFreq = sampleRate / 2;
    const lowMel = hzToMel(lowFreq);
    const highMel = hzToMel(highFreq);

    const melPoints = new Float32Array(numFilters + 2);
    for (let i = 0; i < numFilters + 2; i++) {
      melPoints[i] = lowMel + (highMel - lowMel) * i / (numFilters + 1);
    }

    const hzPoints = melPoints.map(mel => melToHz(mel));
    const binPoints = hzPoints.map(hz => Math.floor((nfft + 1) * hz / sampleRate));

    const filterbank = [];
    for (let i = 0; i < numFilters; i++) {
      const filter = new Float32Array(Math.floor(nfft / 2) + 1);
      for (let j = binPoints[i]; j < binPoints[i + 1]; j++) {
        filter[j] = (j - binPoints[i]) / (binPoints[i + 1] - binPoints[i]);
      }
      for (let j = binPoints[i + 1]; j < binPoints[i + 2]; j++) {
        filter[j] = (binPoints[i + 2] - j) / (binPoints[i + 2] - binPoints[i + 1]);
      }
      filterbank.push(filter);
    }
    return filterbank;
  };

  // Extract MFCC features from audio
  const extractMFCC = (audioData, sampleRate) => {
    // Resample if necessary
    let resampled = audioData;
    if (sampleRate !== TARGET_SAMPLE_RATE) {
      const ratio = TARGET_SAMPLE_RATE / sampleRate;
      const newLength = Math.floor(audioData.length * ratio);
      resampled = new Float32Array(newLength);
      for (let i = 0; i < newLength; i++) {
        const srcIdx = i / ratio;
        const srcIdxFloor = Math.floor(srcIdx);
        const srcIdxCeil = Math.min(srcIdxFloor + 1, audioData.length - 1);
        const t = srcIdx - srcIdxFloor;
        resampled[i] = audioData[srcIdxFloor] * (1 - t) + audioData[srcIdxCeil] * t;
      }
    }

    // Pad or truncate to fixed length
    let processed = new Float32Array(SEGMENT_SAMPLES);
    if (resampled.length > SEGMENT_SAMPLES) {
      const start = Math.floor((resampled.length - SEGMENT_SAMPLES) / 2);
      processed = resampled.slice(start, start + SEGMENT_SAMPLES);
    } else if (resampled.length < SEGMENT_SAMPLES) {
      const padLeft = Math.floor((SEGMENT_SAMPLES - resampled.length) / 2);
      processed.set(resampled, padLeft);
    } else {
      processed = resampled;
    }

    // Normalize amplitude
    const maxAmp = Math.max(...processed.map(Math.abs));
    if (maxAmp > 0) {
      for (let i = 0; i < processed.length; i++) {
        processed[i] /= maxAmp;
      }
    }

    // Calculate number of frames
    const numFrames = Math.ceil(SEGMENT_SAMPLES / HOP_LENGTH);
    const numMelFilters = 128;

    // Create mel filterbank
    const melFilterbank = createMelFilterbank(numMelFilters, N_FFT, TARGET_SAMPLE_RATE);

    // Extract MFCC for each frame
    const mfccs = [];
    for (let frame = 0; frame < numFrames; frame++) {
      const start = frame * HOP_LENGTH;
      const end = Math.min(start + N_FFT, processed.length);

      // Get frame with zero padding
      const frameData = new Float32Array(N_FFT);
      for (let i = 0; i < N_FFT && start + i < processed.length; i++) {
        // Apply Hanning window
        const window = 0.5 * (1 - Math.cos(2 * Math.PI * i / (N_FFT - 1)));
        frameData[i] = processed[start + i] * window;
      }

      // Compute FFT magnitude spectrum (simplified using DFT)
      const fftSize = Math.floor(N_FFT / 2) + 1;
      const spectrum = new Float32Array(fftSize);
      for (let k = 0; k < fftSize; k++) {
        let real = 0, imag = 0;
        for (let n = 0; n < N_FFT; n++) {
          const angle = -2 * Math.PI * k * n / N_FFT;
          real += frameData[n] * Math.cos(angle);
          imag += frameData[n] * Math.sin(angle);
        }
        spectrum[k] = Math.sqrt(real * real + imag * imag);
      }

      // Apply mel filterbank
      const melSpectrum = new Float32Array(numMelFilters);
      for (let i = 0; i < numMelFilters; i++) {
        let sum = 0;
        for (let j = 0; j < fftSize; j++) {
          sum += spectrum[j] * melFilterbank[i][j];
        }
        melSpectrum[i] = Math.log(Math.max(sum, 1e-10));
      }

      // Apply DCT to get MFCCs
      const dctResult = dctII(melSpectrum);
      mfccs.push(dctResult.slice(0, N_MFCC));
    }

    // Transpose to (n_mfcc, n_frames) and convert to Float32Array
    const result = new Float32Array(N_MFCC * numFrames);
    for (let i = 0; i < N_MFCC; i++) {
      for (let j = 0; j < numFrames; j++) {
        result[i * numFrames + j] = mfccs[j][i];
      }
    }

    return { data: result, numFrames };
  };

  const softmax = (arr) => {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
  };

  const runInference = async (audioData, sampleRate) => {
    if (!sessionRef.current) {
      throw new Error('Model not loaded');
    }

    // Extract MFCC features
    const { data: mfccData, numFrames } = extractMFCC(audioData, sampleRate);

    // Create input tensor [1, n_mfcc, n_frames]
    const inputTensor = new ort.Tensor('float32', mfccData, [1, N_MFCC, numFrames]);

    // Run inference
    const feeds = { audio_features: inputTensor };
    const results = await sessionRef.current.run(feeds);

    // Get outputs
    const ageLogits = Array.from(results.age_logits.data);
    const genderLogits = Array.from(results.gender_logits.data);

    // Apply softmax
    const ageProbs = softmax(ageLogits);
    const genderProbs = softmax(genderLogits);

    // Get predictions
    const ageIdx = ageProbs.indexOf(Math.max(...ageProbs));
    const genderIdx = genderProbs.indexOf(Math.max(...genderProbs));

    return {
      age: {
        prediction: AGE_LABELS[ageIdx],
        confidence: ageProbs[ageIdx],
        probabilities: Object.fromEntries(AGE_LABELS.map((l, i) => [l, ageProbs[i]]))
      },
      gender: {
        prediction: GENDER_LABELS[genderIdx],
        confidence: genderProbs[genderIdx],
        probabilities: Object.fromEntries(GENDER_LABELS.map((l, i) => [l, genderProbs[i]]))
      }
    };
  };

  const startRecording = async () => {
    try {
      setError(null);
      setResult(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: TARGET_SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      // Create audio context for later processing
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: TARGET_SAMPLE_RATE
      });

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      }

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        processRecording();
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);

      startTimeRef.current = Date.now();
      timerIntervalRef.current = setInterval(() => {
        setTimer((Date.now() - startTimeRef.current) / 1000);
      }, 100);

    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone access.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found.');
      } else {
        setError(`Failed to start recording: ${err.message}`);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  const processRecording = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: mediaRecorderRef.current.mimeType
    });

    if (audioBlob.size < 1000) {
      setError('Recording too short. Please record at least 1 second.');
      return;
    }

    setIsProcessing(true);

    try {
      // Convert blob to audio buffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

      // Get audio data (mono)
      const audioData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;

      // Run inference
      const prediction = await runInference(audioData, sampleRate);
      setResult(prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Prediction failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setTimer(0);
    }
  };

  if (isModelLoading) {
    return (
      <div className="voice-demo">
        <div className="voice-demo-loading">
          <div className="loading-spinner"></div>
          <p>Loading AI model...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-demo">
      <div className="voice-demo-controls">
        <button
          className={`record-btn ${isRecording ? 'recording' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="processing-icon">...</span>
          ) : isRecording ? (
            <span className="stop-icon">■</span>
          ) : (
            <span className="mic-icon">🎤</span>
          )}
        </button>

        <div className="voice-demo-status">
          {isProcessing && <p>Analyzing voice...</p>}
          {isRecording && <p>Recording... {timer.toFixed(1)}s</p>}
          {!isRecording && !isProcessing && !result && !error && (
            <p>Click to record your voice</p>
          )}
        </div>
      </div>

      {error && (
        <div className="voice-demo-error">
          {error}
        </div>
      )}

      {result && (
        <div className="voice-demo-results">
          <div className="result-card">
            <div className="result-label">Age Group</div>
            <div className="result-value">{formatAge(result.age.prediction)}</div>
            <div className="result-confidence">
              {(result.age.confidence * 100).toFixed(0)}% confidence
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${result.age.confidence * 100}%` }}
              />
            </div>
          </div>

          <div className="result-card">
            <div className="result-label">Gender</div>
            <div className="result-value">
              {result.gender.prediction.charAt(0).toUpperCase() +
               result.gender.prediction.slice(1)}
            </div>
            <div className="result-confidence">
              {(result.gender.confidence * 100).toFixed(0)}% confidence
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${result.gender.confidence * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

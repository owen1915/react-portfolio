const courses = [
  "Data Structures and Algorithms",
  "Software Design & Data Structures",
  "Intermediate Software Design",
  "Computer Organization I & II",
  "Mobile Software Development",
  "Intro to Problem Solving in CS",
  "Professionalism in Computing",
  "Discrete Mathematics",
  "Applied Combinatorics",
  "Systems",
  "Ethics in Computer Science"
];

export default function ExperiencePage() {
  return (
    <>
      <section>
        <h2>Education</h2>
        <div className="item">
          <h3>Virginia Tech</h3>
          <span className="org">Master of Engineering in Computer Science</span>
          <p>Expected Spring 2027</p>
        </div>
        <div className="item">
          <h3>Virginia Tech</h3>
          <span className="org">Bachelor of Science in Computer Science</span>
          <p>Graduated Spring 2026</p>
        </div>
        <div className="item">
          <h3>Reynolds Community College</h3>
          <span className="org">Associate Degree, Dual Enrollment</span>
          <p>Graduated 2023</p>
        </div>
        <div className="item">
          <h3>Open High School</h3>
          <span className="org">Ranked #2 in Virginia, #62 Nationally</span>
          <p>Graduated 2023, 4th in class</p>
        </div>
      </section>

      <section>
        <h2>Experience</h2>
        <div className="item">
          <h3>DevOps Engineer Intern</h3>
          <span className="org">Kinsale Insurance, Richmond, VA</span>
          <p>May 2026 - August 2026</p>
          <p>
            Built OpsKiosk, a centralized software inventory platform that
            automatically pulls ownership, dependency, pipeline health, and
            activity metadata from 120+ GitLab projects and makes it searchable
            in one place. Replaced hours of manual repository-by-repository
            searching with a single query, and was adopted by 50+ engineers and
            managers as the source of truth for software inventory.
          </p>
        </div>
        <div className="item">
          <h3>Teaching Assistant, Computer Systems</h3>
          <span className="org">
            Virginia Tech, Department of Computer Science
          </span>
          <p>August 2026 - Present</p>
          <p>
            Supporting 150+ students through office hours and lab sessions in C
            systems programming, concurrency, virtual memory, and network
            programming, and grading large systems projects including a Unix
            shell, a thread pool, and a multithreaded HTTP server.
          </p>
        </div>
      </section>

      <section>
        <h2>Research</h2>
        <div className="item">
          <h3>Undergraduate Researcher</h3>
          <span className="org">
            Virginia Tech,{" "}
            <a href="https://che.vt.edu/People/faculty/Achenie.html" target="_blank" rel="noreferrer">
              Dr. Luke Achenie
            </a>
          </span>
          <p>August 2025 - May 2026</p>
          <p>
            AI-driven scientific modeling, LLM-guided symbolic regression,
            multi-stage optimization pipelines, and computational frameworks
            for extracting governing equations from data.
          </p>
        </div>
      </section>

      <section>
        <h2>Relevant Coursework</h2>
        <div className="courses">
          {courses.map((course, i) => (
            <span key={i} className="course">{course}</span>
          ))}
        </div>
      </section>
    </>
  );
}

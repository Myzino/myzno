import { DATA } from "@/app/data/dummys";
import { FlipWords } from "@/components/ui/flip-words";
import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  const words = ["Web Developer", "Troubleshooter", "IoT-Driven Technology Lover", "Custom Web Designer"];
  return (
    <main>
      <section className="about section" id="about">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>About Me</h2>
            </div>
          </div>
          <div className="row">
            <div className="about-content padd-15">
              <div className="row">
                <div className="about-text padd-15">
                  <h2>
                    I am Jeffrey a <FlipWords words={words} />
                  </h2>
                  <p>
                  I am a Bachelor of Science in Information Technology student passionate about building innovative systems and exploring IoT technologies. My projects focus on combining system development with cutting-edge solutions, such as RFID-based access control systems.

With certifications like TOPCIT and Cyberthreat Management under my belt, I continuously strive to enhance my skills and stay ahead of tech trends. When I’m not coding, I enjoy diving into new technologies and brainstorming impactful solutions. Let’s collaborate to create something extraordinary!
                  </p>
                  <div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="personal-info padd-15">
                  <div className="row">
                    <div className="info-item padd-15">
                      <p>
                        Website : <span>{DATA.website || "https://example.com"}</span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        Email : <span>{DATA.email}</span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        Degree : <span>BSIT(undergraduate)</span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        Phone : <span>{DATA.phone}</span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        City : <span>Valencia City, Bukidnon</span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        Freelance : <span>Available</span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="buttons padd-15">
                      <a
                        href="/assets/docs/resume.pdf"
                        target="_target"
                        className="btn"
                      >
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
                <div className="skills padd-15">
                  <div className="row">
                    <div className="skill-item padd-15">
                      <h5>Nextjs</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "90%",  backgroundColor: "grey" }} />
                        <div className="skill-percent">90%</div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>Laravel</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "86%", backgroundColor: "red" }} />
                        <div className="skill-percent">86%</div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>React</h5>
                      <div className="progress">
                        <div className="progress-in " style={{ width: "80%",  backgroundColor: "blue" }} />
                        <div className="skill-percent">80%</div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>Python</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "80%",  backgroundColor: "yellow" }} />
                        <div className="skill-percent">80%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="education padd-15">
                  <h3 className="title">Education</h3>
                  <div className="row">
                    <div className="timeline-box padd-15">
                      <div className="timeline shadow-dark">
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> 2021 to Present
                          </h6>
                          <h4 className="timeline-title">
                            Bukidnon State University (Bachelor of Science in Information Technology)
                          </h4>
                          <p className="timeline-text">
                            I am currently studying Bachelor of Science in Information Technology at Bukidnon State University. I am in my 4th year and will soon be Graduating. i am immerse in Web development and IoT Technologies  and Have an experience in Deep Learning Classification
                          </p>
                        </div>
                        {/* Timeline Item end */}
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> 2019 to 2021
                          </h6>
                          <h4 className="timeline-title">
                           N/A
                          </h4>
                          <p className="timeline-text">
                            Adding this  on a later date
                          </p>
                        </div>
                        {/* Timeline Item end */}
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> 2014 to 2019
                          </h6>
                          <h4 className="timeline-title">
                            N/A
                          </h4>
                          <p className="timeline-text">
                            Adding this on the later date
                          </p>
                        </div>
                        {/* Timeline Item end */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="experience padd-15">
                  <h3 className="title">Bukidnon State University</h3>
                  <div className="row">
                    <div className="timeline-box padd-15">
                      <div className="timeline shadow-dark">
                        {/* Timeline Item */}
                        <Image 
                                            src="/imgs/blog/bsu.jpg" 
                                            alt="Creative Slideshow" 
                                            width={500} 
                                            height={400} 
                                          />
                        {/* Timeline Item end */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

import type { NextPage } from "next";
import Image from "next/image";

const Blog: NextPage = () => {
  return (
    <>
      <section className="blog section" id="blog">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2> Recent Projects</h2>
            </div>
          </div>
          <div className="row">
            {/* Blog Item 1 */}
            <div className="blog-item padd-15">
              <div className="blog-item-inner shadow-dark">
                <div className="blog-img">
                  <Image 
                    src="/imgs/blog/cityvet.jpg" 
                    alt="Responsive Web Design" 
                    width={300} 
                    height={300} 
                  />
                  <div className="blog-date">June 4, 2023</div>
                </div>
                <div className="blog-info">
                  <h4 className="blog-title">
                    MCity Veterinary System
                  </h4>
                  <p className="blog-description">
                    A system developed for the City Veterinary Office in Malaybalay City, featuring basic CRUD functionalities, inventory management, and archiving for streamlined operations and efficient record-keeping.
                  </p>
                  <p className="blog-tags">
                    Tags: <a href="#">Reactjs</a>, <a href="#">Nodejs</a>, <a href="#">MongoDB Atlas/Local</a>
                  </p>
                </div>
              </div>
            </div>
            {/* Blog Item 1 End */}

            {/* Blog Item 2 */}
            <div className="blog-item padd-15">
              <div className="blog-item-inner shadow-dark">
                <div className="blog-img">
                  <Image 
                    src="/imgs/blog/buksucaps.jpg" 
                    alt="Creative Slideshow" 
                    width={300} 
                    height={300} 
                  />
                  <div className="blog-date">June 4, 2024</div>
                </div>
                <div className="blog-info">
                  <h4 className="blog-title">
                    BukSu Labsecure Software Application
                  </h4>
                  <p className="blog-description">
                    A capstone project integrated with real-time user attendance monitoring, utilizing IoT-driven technologies and connected through an MQTT broker for seamless data transmission and efficient tracking.
                  </p>
                  <p className="blog-tags">
                    Tags: <a href="#">Laravel</a>, <a href="#">Mysql</a>
                  </p>
                </div>
              </div>
            </div>
            {/* Blog Item 2 End */}

            {/* Blog Item 3 */}
            <div className="blog-item padd-15">
              <div className="blog-item-inner shadow-dark">
                <div className="blog-img">
                  <Image 
                    src="/imgs/blog/ebrangay.png" 
                    alt="Image Gallery Lightbox" 
                    width={300} 
                    height={300} 
                  />
                  <div className="blog-date">June 4, 2023</div>
                </div>
                <div className="blog-info">
                  <h4 className="blog-title">
                    E-Barangay Certification Management
                  </h4>
                  <p className="blog-description">
                    A SaaS Multi-Tenancy System built for Barangay Sinayawan, designed to generate PDF Certificates for easy documentation and streamlined issuance of barangay records, ensuring efficiency and accessibility.  
                  </p>
                  <p className="blog-tags">
                    Tags: <a href="#">Laravel</a>, <a href="#">Mysql</a>
                  </p>
                </div>
              </div>
            </div>
            {/* Blog Item 3 End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

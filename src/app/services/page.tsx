import { IconCloud } from "@/components/ui/circle";
import type { NextPage } from "next";

const Service: NextPage = () => {
  const slugs = [
    "typescript",
    "javascript",
    "java",
    "react",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "firebase",
    "vercel",
    "git",
    "github",
    "visualstudiocode",
    "androidstudio",
    "figma",
  ];
  return (
    <>
        <section className="service section" id="services">
  <div className="container">
    <div className="row">
      <div className="section-title padd-15">
        <h2>Skills</h2><br />
        <p>Throughout college, I honed my skills in web development, custom web design, and logo designing, enabling me to create functional websites, tailor unique designs, and craft impactful brand identities. </p>
      </div>
      
    </div>
    <div className="row">
    <div className="service-item padd-15">
        <div className="service-item-inner">
          <div className="icon"><i className="fa fa-code" /></div>
          <h4>Web Development</h4>
          <p>Turn your digital ideas into reality with my web development solutions. I specialize in crafting
            robust
            and dynamic websites that are tailored to meet your specific business needs and objectives using Nextjs and Laravel.</p>
        </div>
      </div>
      {/* Service Item 1: Logo Design */}
      <div className="service-item padd-15">
        <div className="service-item-inner">
          <div className="icon"><i className="fa fa-paint-brush" /></div>
          <h4>Logo Designing</h4>
          <p>Elevate your brand with a unique and memorable logo. My expertise in designing will create a distinctive
            logo
            that reflects your business identity and leaves a lasting impression on the clients.</p>
        </div>
      </div>
      {/* Service Item 1 End */}
      {/* Service Item 2: Web Design */}
      <div className="service-item padd-15">
        <div className="service-item-inner">
          <div className="icon"><i className="fa fa-laptop" /></div>
          <h4>Custom Web Design</h4>
          <p>Create a stunning online presence with my custom web design skills. tailoring a website that
            not only
            looks impressive but also delivers a seamless user experience, helping you achieve your online goals.
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="section-title padd-15">
        <h2>Tools i use</h2><br />
        <p>
        Throughout my work, I have utilized a wide range of tools to build scalable web applications, design custom interfaces, manage projects, and streamline development processes effectively.</p>
        </div>
        <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
      
    </div>
  </div>
</section>


    </>
  );
};

export default Service;

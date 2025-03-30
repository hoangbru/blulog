"use client";

import LoginForm from "./LoginForm";

const LoginContainer = () => {
  
  return (
    // <!-- Login -->
    <section className="section-login padding-tb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="section-title bb-center"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="section-detail">
                <h2 className="bb-title">
                  Log <span>In</span>
                </h2>
                <p>Best place to buy and sell digital products</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div
              className="bb-login-contact"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginContainer;

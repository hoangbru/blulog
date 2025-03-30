import RegisterForm from "./RegisterForm";

const RegisterContainer = () => {
  return (
    // <!-- Register -->
    <section className="section-register padding-tb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="bb-register"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="row">
                <div className="col-12">
                  <div className="section-title bb-center">
                    <div className="section-detail">
                      <h2 className="bb-title">Register</h2>
                      <p>Best place to buy and sell digital products</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterContainer;

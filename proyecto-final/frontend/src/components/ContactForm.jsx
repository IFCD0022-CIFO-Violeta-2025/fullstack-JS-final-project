export default function Login() {
    return (
        <div className="container-fluid mt-5 ">
            <div className="row justify-content-center ">
                <div className="col-12 col-md-6 col-lg-6">
                    <div className="card shadow p-4 mb-5">
                        <h1 className="text-center mt-4 mb-4">Contact Form</h1>
                        <form action="/login" method="POST">
                            <div className="mb-3">
                                <label for="contactEmail" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="contactEmail" name="contactEmail" placeholder="Your Email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="questionType" className="form-label">Question Type</label>
                                <input type="text" className="form-control" id="questionType" name="questionType"
                                    placeholder="Question Type" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="writeYour" className="form-label">Write your Thoughts</label>
                                <textarea className="form-control" id="writeYour" name="writeYour" required rows="3"
                                    placeholder="Descripcion"></textarea>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-12 col-lg-12">
                                    <button type="submit" className="btn btn-primary w-100">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
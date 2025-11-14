export default function SignUp() {
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-6">
                    <div className="card shadow p-4 mb-5">
                        <h1 className="text-center mt-4 mb-4">Crear Cuenta Nueva</h1>
                        <form action="/registro" method="POST">
                            <div className="mb-3">
                                <label for="signupEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="signupEmail" name="signupEmail" placeholder="Email" required/>
                            </div>
                            <div className="mb-3">
                                <label for="signupPassword" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="signupPassword" name="signupPassword" placeholder="Contraseña" required/>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-12 col-lg-6">
                                    <button type="submit" className="btn btn-primary w-100">Crear Cuenta</button>
                                </div>
                                <div className="mb-3 col-md-12 col-lg-6">
                                    <p>* Al crear la cuenta recibirás un e-mail de verificación con un enlace de acceso a tu perfil.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
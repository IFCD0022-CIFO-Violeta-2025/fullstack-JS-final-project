export default function Login() {
    return (
        <div className="container-fluid mt-5 ">
            <div className="row justify-content-center ">
                <div className="col-12 col-md-6 col-lg-6">
                    <div className="card shadow p-4 mb-5">
                        <h1 className="text-center mt-4 mb-4">Iniciar Sesión</h1>
                        <form action="/login" method="POST">
                            <div className="mb-3">
                                <label for="loginEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="loginEmail" name="loginEmail" placeholder="Email" required/>
                            </div>
                            <div className="mb-3">
                                <label for="loginPassword" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="loginPassword" name="loginPassword" placeholder="Contraseña"
                                    required/>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-12 col-lg-6">
                                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                                </div>
                                <div className="mb-3 col-md-12 col-lg-6">
                                    <button type="button" className="btn btn-success w-100"
                                        onclick="recuperarContrasena()">¿Olvidaste la contraseña?</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
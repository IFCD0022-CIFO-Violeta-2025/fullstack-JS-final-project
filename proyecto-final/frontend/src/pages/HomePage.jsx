import Card from "../components/Card";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function HomePage() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h1 className="text-center mt-4" style={{ color: theme.titleColor }}>
                PUBLICACIONES
            </h1>

            <div className="main-content">
                <div className="row g-4 justify-content-start">
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                    <div className="col-auto">
                        <Card />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
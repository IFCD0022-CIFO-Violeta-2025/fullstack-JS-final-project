import { useNavigate } from "react-router-dom";

export default function OkModal(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.route) {
      navigate(props.route); // navega a la ruta
    }
    // si no hay ruta, Bootstrap ya se encarga de cerrar el modal con data-bs-dismiss="modal"
  };

  return (
    <div
      className="modal fade"
      id="okModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss={props.route ? "" : "modal"}
              aria-label="Close"
              onClick={handleClick}
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
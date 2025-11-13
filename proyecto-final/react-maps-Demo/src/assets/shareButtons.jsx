import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon
} from 'react-share';

const ShareButtons = ({ lat, lng, title }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
      

      <TelegramShareButton url={mapsUrl} title={title}>
        <TelegramIcon size={40} round />
      </TelegramShareButton>

      <WhatsappShareButton url={mapsUrl} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <EmailShareButton url={mapsUrl} subject={title} body={`Mapa de Google: ${mapsUrl}`}>
        <EmailIcon size={40} round />
      </EmailShareButton>

      <TwitterShareButton url={mapsUrl} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <FacebookShareButton url={mapsUrl} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
    </div>
  );
};

export default ShareButtons;
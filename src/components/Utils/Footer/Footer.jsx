import ScrollingText from '../ScrollingText';
const Footer = () => {
  return (
    <div id="footer">
      <ScrollingText
        text="Free Palestine"
        bgColor="#000"
        textColor="#294032"
        iconColor="#4ED469"
        repeatCount={20}
        speed={10}
      />
    </div>
  );
};
export default Footer;

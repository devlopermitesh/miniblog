const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6">
      <div className="container mx-auto flex justify-center items-center">
        <img
          src="https://image.similarpng.com/very-thumbnail/2020/07/Popular-social-media-Blogger-logo-on-transparent-PNG.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <p>&copy; 2024 Your Blog Name</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

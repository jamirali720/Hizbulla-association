

const Footer = () => {
    return (
        <div className='h-12 md:h-32 md:flex justify-center items-center'>
            <p className='text-center'>&copy; {new Date().getFullYear()} Developed by Jamir Ali. All rights reserved.</p>
        </div>
    );
};

export default Footer;
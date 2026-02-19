const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8 border-t">
            <div className="mx-auto py-7 container text-center">
                <p>&copy; {new Date().getFullYear()} Toko Faiz Market. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
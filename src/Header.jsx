import './Header.css';

export default function Header() {
    const toolbarIcon = "/Icon128.png"

    return (
        <header className="header">
            <img src={toolbarIcon} alt="LiteTracker Logo" className="logo" />
            <h3>GT Motorcycle Parking Map - F2025</h3>
        </header>
    );
}
import './Header.css';
import ImageButton from './ImageButton'

export default function Header() {

    const openForm = () => {
        window.open("https://forms.gle/HrDA1DpbJmrSu6mx5", "_blank");
    }

    return (
        <header className="header">
            <img src="/GTMotoMap/Icon128.png" alt="LiteTracker Logo" className="logo" />
            <h3>GT Motorcycle Parking Map - F2025</h3>
            <ImageButton imageSrc="/GTMotoMap/google-forms.png" onClick={openForm} alt="New Parking Spot Form" tooltip="New Parking Spot Form"></ImageButton>
        </header>
    );
}
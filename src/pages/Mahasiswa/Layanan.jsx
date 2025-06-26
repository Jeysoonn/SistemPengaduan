import { FaServicestack } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";

export default function Layanan() {
    return (
        <div>
            <PageHeader title="Layanan" icon={<FaServicestack className="text-2xl text-[#fbfbfa]"/>}/>
        </div>
    );
}

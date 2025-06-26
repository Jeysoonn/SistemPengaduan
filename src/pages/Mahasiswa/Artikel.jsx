import { FaNewspaper } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";

export default function Artikel() {
    return (
        <div>
            <PageHeader title="Artikel" icon={<FaNewspaper className="text-2xl text-[#fbfbfa]"/>}/>
        </div>
    );
}

import { FaQuestionCircle } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";

export default function FAQ() {
    return (
        <div>
            <PageHeader title="FAQ" icon={<FaQuestionCircle className="text-2xl text-[#fbfbfa]"/>}/>
        </div>
    );
}

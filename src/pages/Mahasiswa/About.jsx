import { FaInfoCircle } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";

export default function About() {
  return (
    <div>
      <PageHeader title="About" icon={<FaInfoCircle className="text-2xl text-[#fbfbfa]"/>}/>
    </div>
  );
}

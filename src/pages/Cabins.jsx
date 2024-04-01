/* eslint-disable no-unused-vars */
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm"
import Button from "../ui/Button";
function Cabins() {
  const [showForm, setShowFrom] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable/>
        <Button onClick={()=>setShowFrom((show)=>!show)}>Add new Cabin</Button>
        {showForm &&<CreateCabinForm/>}
      </Row>
    </>
  );
}

export default Cabins;

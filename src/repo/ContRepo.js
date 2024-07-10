//연속레포의 메인레포
import Header from "./header/Header";
import ContThingRepo from "./ContThingRepo";
import ContPeopleRepo from "./ContPeopleRepo";
const ContRepo = () => {
  return (
    <>
      <Header theme={"cont"} />
      <div style={{ display: "flex" }}>
        <ContPeopleRepo />
        <ContThingRepo />
      </div>
    </>
  );
};

export default ContRepo;

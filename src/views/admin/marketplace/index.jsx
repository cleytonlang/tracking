import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

const Marketplace = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Daily Orders
          </h4>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar6, avatar7]}
            title="Order 1002"
            author="John Doe"
            price="9"
            address="84 Nipigon Ave"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar7]}
            title="Order 1003"
            author="Bruno"
            price="7"
            address="259 Otonabee Ave"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar2, avatar6]}
            title="Order 1004"
            author="Antonie Smith"
            price="29"
            address="128 Glenmanor Way"
            image={NFt4}
          />
        </div>

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Tomorrow's orders
          </h4>
        </div>

        {/* Recently Add NFTs */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar6, avatar7]}
            title="Order 1005"
            author="Patrick Doe"
            price="14"
            address="7950 Bathurst St"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar7]}
            title="Order 1006"
            author="William Doe"
            price="11"
            address="54-2 Ventura Way"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar2, avatar6]}
            title="Order 1007"
            author="Antonie Smith"
            price="25"
            address="230 Acton Ave"
            image={NFt4}
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
      </div>
    </div>
  );
};

export default Marketplace;

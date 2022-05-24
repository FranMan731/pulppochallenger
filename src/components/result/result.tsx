import type { NextComponentType } from "next";
//Componets
import Item from "../item/item";
import Loading from "../loading/loading";
//Type
import { ItemInterface } from "../../types";
//Redux
import { useSelector } from "react-redux";
//CSS
import styles from "./Result.module.scss";

const Result: NextComponentType = () => {
    const { search } = useSelector((state: any) => state.app);

    return (
        <div className={styles.main}>
            {search.data.map((x: ItemInterface) => (
                <Item key={x._id} item={x} />
            ))}

            {search.loading && search.filter.search !== "" ? (
                <Loading />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Result;

//Type
import { ItemInterface } from "../../types";
//Ant
import { Card, Avatar } from "antd";
//CSS
import styles from "./Item.module.scss";

type Props = {
    item: ItemInterface
}

const Item: React.FC<Props> = ({item}) => {
    const { Meta } = Card;
    const description = item.description != null && item.description.length > 200 ? item.description.substring(0, 200).concat("...") : item.description;
    const image = item.pictures && item.pictures[0] != null ? item.pictures[0].url : null;

    return (
        <Card 
            key={item._id} 
            className={styles.itemCard}
            cover={<img alt="img0" src={`${image}`} />}
        >
            <Meta
                title={item.title}
                description={description}
            />
        </Card>
    );
};

export default Item;

import { useState, useEffect } from "react";
//Ant
import { 
    Modal, 
    Button, 
    Input,
    Select,
    InputNumber,
} from "antd";
import { FilterOutlined, FilterFilled, ClearOutlined } from '@ant-design/icons';
//CSS
import styles from "./SearchAndFilter.module.scss";

//Redux
import { useAppSelector } from "../../app/hooks";

interface SearchProps {
    handleOnChange: (type: string, value: any) => void,
    handleClearFilters: () => void
}

const SearchAndFilter: React.FC<SearchProps> = ({ handleOnChange, handleClearFilters }) => {
    const [openModal, setOpenModal] = useState(false);
    const [mobile, setMobile] = useState(true);
    const { search } = useAppSelector((state: any) => state.app);

    useEffect(() => {
        const isMobile = typeof window === "undefined";
        
        if (!isMobile) {
            setMobile(false);
        }
    }, []);

    const handleModal = () => {
        setOpenModal(prevState => !prevState);
    }    

    return (
        <>
            <div className={styles.container}>
                <Input 
                    placeholder="Enter ubication"
                    size={mobile ? "small" : "large"}
                    className={styles.inputSearch}
                    onChange={(e) => handleOnChange("search", e.target.value)}
                />
                <Button 
                    size={mobile ? "small" : "large"}
                    icon={search.thereAreFilters ? <FilterFilled /> : <FilterOutlined />}
                    onClick={() => handleModal()}
                >
                    Filters
                </Button>
                {search.thereAreFilters ? (
                    <Button 
                        size={mobile ? "small" : "large"}
                        icon={<ClearOutlined />}
                        onClick={() => handleClearFilters()}
                    >
                        Clear Filters
                    </Button>
                ) : (<></>)}
            </div>
            <Modal
                centered
                title="Filters"
                className={styles.modalContainer}
                visible={openModal}
                closable
                onOk={() => handleModal()}
                onCancel={() => handleModal()}
                okText="Filter"
                cancelText="Reset Filters"
            >   
                <h4>Properties</h4>
                <div className={styles.typeContainer}>
                    <Select
                        placeholder="Select types..."
                        maxTagCount="responsive"
                        style={{width: "100%"}}
                        mode="multiple"
                        options={search.options}
                        value={search.filter.propertyTypes}
                        onChange={(value) => handleOnChange("propertyTypes", value)}
                    />
                </div>
                <h4>Price</h4>
                <div className={styles.priceContainer}>
                    <InputNumber 
                        placeholder="Min. price"
                        prefix="$" 
                        value={search.filter.minPrice}
                        style={{ marginRight: 5 }}
                        className={styles.priceInput}
                        onChange={(value) => handleOnChange("minPrice", value)}
                    />
                    <InputNumber 
                        placeholder="Max price"
                        prefix="$" 
                        value={search.filter.maxPrice}
                        style={{ marginLeft: 5 }}
                        className={styles.priceInput}
                        onChange={(value) => handleOnChange("maxPrice", value)}
                    />
                </div>
            </Modal>
        </>
    );
};

export default SearchAndFilter;

import ItemCard from '../ItemCard';
import { TambahItemButton } from '../Buttons';
import { AmbilItemModal, TambahItemModal } from '../KantinModal';
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const Kantin = () => {
    const [items, setItems] = useState([]);
    const [takeItemModalOpen, setTakeItemModalOpen] = useState(false);
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        refreshData();
    }, []);

    const handleOpenItem = (id) => {
        setTakeItemModalOpen(true);
        setCurrentItem(items.find((item) => item.id === id));
    };

    const openNewItemModal = () => {
        setNewItemModalOpen(true);
    };

    const closeModal = (refresh) => {
        setTakeItemModalOpen(false);
        setNewItemModalOpen(false);
        if (refresh) refreshData();
    };

    const refreshData = async () => {
        setItems([]);
        const querySnapshot = await getDocs(
            collection(getFirestore(), 'items')
        );

        const itemsData = [];

        querySnapshot.forEach((doc) => {
            itemsData.push(doc.data());
        });

        setItems(itemsData);
    };

    return (
        <div className='w-screen mt-8'>
            {takeItemModalOpen && (
                <AmbilItemModal item={currentItem} closeModal={closeModal} />
            )}
            {newItemModalOpen && <TambahItemModal closeModal={closeModal} />}
            <div className='w-[300px] md:w-[740px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1520px] mx-auto'>
                <div className='flex justify-between items-center'>
                    <h1>Kantin</h1>
                    <TambahItemButton
                        className='hidden md:flex'
                        onClick={openNewItemModal}
                    >
                        Tambah Item
                    </TambahItemButton>
                    <TambahItemButton
                        className='md:hidden'
                        onClick={openNewItemModal}
                    ></TambahItemButton>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-[35px] gap-y-6 mt-6'>
                    {items.map((item) => (
                        <ItemCard
                            name={item.name}
                            price={item.price}
                            id={item.id}
                            filename={item.filename}
                            handleOpenItem={handleOpenItem}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Kantin;

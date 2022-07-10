import { SolidButton } from './Buttons';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

const ItemCard = ({ name, price, id, filename, handleOpenItem }) => {
    const [imgUrl, setImgUrl] = useState('');

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    };

    useEffect(() => {
        (async () => {
            const url = await getDownloadURL(
                ref(getStorage(), `items/${id}/${filename}`)
            );

            setImgUrl(url);
        })();
    }, []);

    return (
        <div className='group h-[400px] rounded-2xl shadow-lg hover:shadow-lghover flex flex-col p-[22px]'>
            <img
                className='rounded-2xl w-[240px] h-[216px] group-hover:shadow-md transition-all self-center'
                src={imgUrl}
                alt='item'
            />
            <h3 className='font-bold mt-[14px]'>{name}</h3>
            <h4 className='font-bold'>{formatRupiah(price)}</h4>
            <SolidButton
                onClick={() => {
                    handleOpenItem(id);
                }}
                className={'mt-4 w-full'}
            >
                Lihat Item
            </SolidButton>
        </div>
    );
};

export default ItemCard;

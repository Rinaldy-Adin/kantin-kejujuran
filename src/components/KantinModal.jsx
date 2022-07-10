import placeholder from '../assets/beng-beng.jpeg';
import ModalWrapper from './ModalWrapper';
import { SmallButton } from './Buttons';
import { ReactComponent as Close } from '../assets/Close.svg';
import { useState, useEffect } from 'react';
import {
    getFirestore,
    setDoc,
    getDoc,
    doc,
    deleteDoc,
    Timestamp,
} from 'firebase/firestore';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import ImageUploader from './ImageUploader';

const AmbilItemModal = ({ item, closeModal }) => {
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [imgUrl, setImgUrl] = useState('');

    const convertTimestamp = (timestamp) => {
        let date = timestamp.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();

        date = dd + '-' + mm + '-' + yyyy;
        return date;
    };

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    };

    const onChange = (e) => {
        setMoneyAmount(e.target.value);
    };

    useEffect(() => {
        (async () => {
            const url = await getDownloadURL(
                ref(getStorage(), `items/${item.id}/${item.filename}`)
            );

            setImgUrl(url);
        })();
    }, []);

    const takeItem = async () => {
        const docSnapshot = await getDoc(
            doc(getFirestore(), 'moneybox', 'box')
        );

        const boxAmount = docSnapshot.data().amount + parseInt(moneyAmount, 10);

        await setDoc(doc(getFirestore(), 'moneybox', 'box'), {
            amount: boxAmount,
        });

        await deleteDoc(doc(getFirestore(), 'items', item.id));

        closeModal(true);
    };

    return (
        <ModalWrapper>
            <div className='max-w-[95%] xl:w-[1063px] xl:h-[450px] bg-white rounded-2xl relative px-[30px] py-[20px] lg:py-[50px] flex flex-col md:flex-row items-center gap-12'>
                <button
                    onClick={() => {
                        closeModal(false);
                    }}
                >
                    <Close className='absolute top-2 right-3' />
                </button>
                <img
                    className='w-[300px] h-[270px] xl:w-[410px] xl:h-[340px] rounded-2xl shadow-lg'
                    src={imgUrl}
                    alt='item'
                />
                <div className='flex flex-col'>
                    <h2 className='font-bold'>{item.name}</h2>
                    <h3 className='font-bold'>{formatRupiah(item.price)}</h3>
                    <p className='text-xs mt-4'>
                        Ditambahkan pada {convertTimestamp(item.timestamp)}
                    </p>
                    <h4 className='mb-8'>{item.desc}</h4>
                    <p>Uang yang akan dimasukkan ke kotak:</p>
                    <SmallTextField onChange={onChange} value={moneyAmount} />
                    <SmallButton
                        onClick={takeItem}
                        className={'self-start mt-3'}
                    >
                        Ambil Item
                    </SmallButton>
                </div>
            </div>
        </ModalWrapper>
    );
};

const TambahItemModal = ({ closeModal }) => {
    const [valueName, setValueName] = useState('');
    const [valueDesc, setValueDesc] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [itemImage, setItemImage] = useState(null);

    const onChangeName = (e) => {
        setValueName(e.target.value);
    };

    const onChangeDesc = (e) => {
        setValueDesc(e.target.value);
    };

    const onChangePrice = (e) => {
        setValuePrice(e.target.value);
    };

    const handleSubmitItem = async () => {
        const itemId = uuid();
        await setDoc(doc(getFirestore(), 'items', itemId), {
            name: valueName,
            desc: valueDesc,
            id: itemId,
            price: parseInt(valuePrice, 10),
            timestamp: Timestamp.now(),
            filename: itemImage.name,
        });

        const storageRef = ref(
            getStorage(),
            `items/${itemId}/${itemImage.name}`
        );
        await uploadBytesResumable(storageRef, itemImage);

        closeModal(true);
    };

    return (
        <ModalWrapper>
            <div className='max-w-[95%] lg:w-[1063px] lg:min-h-[450px] bg-white rounded-2xl relative px-[30px] py-[20px] lg:py-[50px] flex flex-col lg:flex-row items-center gap-12'>
                <button
                    onClick={() => {
                        closeModal(false);
                    }}
                >
                    <Close className='absolute top-2 right-3' />
                </button>
                <ImageUploader
                    className='w-[310px] h-[240px] lg:w-[410px] lg:h-[340px] rounded-2xl shadow-lg '
                    handleFile={(file) => {
                        setItemImage(file);
                    }}
                    currentImg={itemImage}
                />
                <div className='flex flex-col px-8'>
                    <p>Nama</p>
                    <input
                        className='w-full text-[32px] leading-[48px] focus:outline-none border border-KJJGray-dark px-2 py-1 rounded-md'
                        type='text'
                        value={valueName}
                        onChange={onChangeName}
                    />

                    <p className='mt-3'>Deskripsi</p>
                    <textarea
                        className='min-h-[100px] focus:outline-none border border-KJJGray-dark px-2 py-1 rounded-md'
                        value={valueDesc}
                        onChange={onChangeDesc}
                    />
                    <p className='mt-4'>Harga</p>
                    <SmallTextField
                        value={valuePrice}
                        onChange={onChangePrice}
                    />
                    <SmallButton
                        className={'self-start mt-3'}
                        onClick={handleSubmitItem}
                    >
                        Tambah Item
                    </SmallButton>
                </div>
            </div>
        </ModalWrapper>
    );
};

const SmallTextField = ({ value, onChange }) => {
    return (
        <div className='w-[250px] px-3 py-1 rounded-[6px] bg-KJJGray flex justify-between items-center font-bold'>
            <h3>Rp</h3>
            <input
                autoFocus
                onChange={onChange}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                className='font-default select-none text-2xl leading-[36px] bg-inherit w-[180px] text-right focus:outline-0'
                value={value}
            />
        </div>
    );
};

export { AmbilItemModal, TambahItemModal };

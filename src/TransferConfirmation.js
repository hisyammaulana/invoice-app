import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from './Api';

export default function TransferConfirmation() {
    const [invoice, setInvoice] = useState({});
    const [bank, setBank] = useState([]);
    const [bentuk, setBentuk] = useState("");
    const [file, setFile] = useState();
    const [tanggal, setTanggal] = useState();
    const { kode } = useParams();

    const getInvoice = async () => {
        const data = await axios(`${BASE_URL}/api/data/spp/transaksi_konfirmasi/kode/${kode}/tagihan`).then(
            (res) => res.data.data
        )

        const data_bank = await axios(`${BASE_URL}/api/data/spp/setting/sekolah/${data.id_sekolah}`).then(
            (res) => res.data.data
        )

        setBank(data_bank);
        setInvoice(data);
    }

    const handleRadioChange = (e) => {
        console.log(e.target.value);
        setBentuk(e.target.value);
    }

    const onChangeFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const onChangeTanggal = (e) => {
        console.log(e.target.value);
        setTanggal(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (file !== undefined) {
            const data = new FormData();
            data.append('file', file);
            data.append('kode', kode);
            data.append('tgl_bayar', tanggal);
            data.append('bentuk', bentuk);
            data.append('id_sekolah', invoice.id_sekolah);

            try {
                const res = await axios.post(`${BASE_URL}/api/data/spp/transaksi_konfirmasi/bukti/konfirmasi`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then((res) => console.log(res))
                // console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getInvoice();
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Bank</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">No. Rekening</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Atas Nama</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Pilih</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bank.map((bnk) => {
                                        return (
                                            <tr key={bnk.id}>
                                                <td className="px-4 py-3">{bnk.nama_bank}</td>
                                                <td className="px-4 py-3">{bnk.rekening_bank}</td>
                                                <td className="px-4 py-3">{bnk.atas_nama}</td>
                                                <td className="w-10 text-center">
                                                    <input name="bentuk" onChange={handleRadioChange} value={bnk.nama_bank} type="radio" />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div className="relative flex-grow w-full">
                            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Upload Bukti Pembayaran</label>
                            <input type="file" id="file" name="file" accept="image/*" onChange={onChangeFile} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative flex-grow w-full">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Tanggal Bayar</label>
                            <input type="date" id="email" name="tgl_bayar" onChange={onChangeTanggal} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button onClick={onSubmit} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Konfirmasi</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

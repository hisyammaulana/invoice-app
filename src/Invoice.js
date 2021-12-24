import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from './Api';

export default function Invoice() {
    const [invoice, setInvoice] = useState({});
    const [tagihan, setTagihan] = useState([]);
    const [status, setStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { kode } = useParams();

    const getInvoice = async () => {
        const data = await axios(`${BASE_URL}/api/data/spp/transaksi_konfirmasi/kode/${kode}/tagihan`).then(
            (res) => res.data.data
        )

        const status = await axios(`${BASE_URL}/api/data/spp/tagihan/order/${data.kode_midtrans}/status`).then(
            (res) => res.data.midtrans.status_code
        )
        console.log(data);
        setInvoice(data);
        setTagihan(data.tagihan);
        setStatus(status);
    }

    useEffect(() => {
        getInvoice();
    }, [])

    const handleRadioChange = async (e) => {
        const data = await axios.put(`${BASE_URL}/api/data/spp/transaksi_konfirmasi/kode/${kode}/metode/${e.target.value}`).then(
            (res) => res.data.data
        );
        getInvoice();
        setShowModal(false);
    };

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Tagihan Pembayaran Tahun Ajaran {invoice.tahun_ajaran}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{invoice.nama} - {invoice.nis}</h1>
                            <div className="flex mb-4">
                                <a className="flex-grow text-green-500 border-b-2 border-green-500 py-2 text-lg px-1">Description</a>
                            </div>
                            <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
                            {tagihan.map((tg) => {
                                return (
                                    <div className="flex border-t border-gray-200 py-2" key={tg.id}>
                                        <span className="text-gray-500">{tg.nama_tagihan}</span>
                                        <span className="ml-auto text-gray-900">Rp. {tg.nominal},00</span>
                                    </div>
                                );
                            })
                            }
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="title-font font-medium text-2xl text-gray-900">Total</span> <span className="title-font font-medium text-2xl text-gray-900 ml-auto">Rp. {invoice.nominal},00</span>
                            </div>
                            <div className="flex">
                                {
                                    status != 200 && invoice.file == null ? <div className="flex m-auto">
                                        {
                                            invoice.bentuk != null ? null : <a className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mx-3" href={`/tagihan/${kode}/konfirmasi`}>Transfer Manual</a>
                                        }
                                        <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded mx-2" onClick={() => setShowModal(true)}>Metode Pembayaran</button>
                                    </div> : null
                                }

                                {
                                    invoice.token_vtweb == null ? null : (status != 200 ? <a href={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${invoice.token_vtweb}`} className="mx-7 text-green-500 inline-flex items-center"> Bayar
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a> : null)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Pilih Metode Pembayaran
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                    <div className="w-full mx-auto overflow-auto">
                                        <table className="table-auto w-full text-left whitespace-no-wrap">
                                            <div className="shadow-md">
                                                <tbody>
                                                    <tr className="tab w-full overflow-hidden border-t">
                                                        <td className="px-4 py-3 text-lg text-gray-900">Gopay</td>
                                                        <td className="w-10 text-center">
                                                            <input name="gopay" type="radio" value="gopay" onChange={handleRadioChange} checked={invoice.bentuk === "gopay"} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">Shopee Pay</td>
                                                        <td className="border-t-2 border-gray-200 w-10 text-center">
                                                            <input name="shopee_pay" type="radio" value="shopee_pay" onChange={handleRadioChange} checked={invoice.bentuk === "shopee_pay"} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">Transfer Bank (Biaya Admin 4500/Transaksi)</td>
                                                        <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                                                            <input name="virtual_account" type="radio" value="virtual_account" onChange={handleRadioChange} checked={invoice.bentuk === "virtual_account"} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </div>
                                        </table>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </section>
        </>
    )
}

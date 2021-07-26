import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Invoice() {
    const [invoice, setInvoice] = useState({});
    const [tagihan, setTagihan] = useState([]);
    const { kode } = useParams();

    const getInvoice = async () => {
        const data = await axios(`http://localhost/smart_school/api/data/spp/transaksi_konfirmasi/kode/${kode}/tagihan`).then(
            (res) => res.data.data
        )
        console.log(data);
        setInvoice(data);
        setTagihan(data.tagihan);
    }

    useEffect(() => {
        getInvoice();
    }, [])

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
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Rp. {invoice.nominal},00</span>
                                {/* <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Metode</button> */}
                                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

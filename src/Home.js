import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Home() {
    const [tagihan, setTagihan] = useState([]);

    const getTagihan = async () => {
        const data = await axios(`http://localhost/smart_school/api/data/spp/transaksi_konfirmasi`).then(
            (res) => res.data.data
        )
        setTagihan(data)
    }

    useEffect(() => {
        getTagihan();
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Transaksi Konfirmasi</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {tagihan.map((tg) => {
                            return (
                                <div className="p-4 xl:w-1/4 md:w-1/2 w-full" key={tg.id}>
                                    <div className="h-full p-6 rounded-lg border-2 border-green-500 flex flex-col relative overflow-hidden">
                                        <span className="bg-green-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">{tg.tahun_ajaran}</span>
                                        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Total Tagihan</h2>
                                        <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                            <span>Rp. {tg.nominal},00</span>
                                        </h1>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>Nama : {tg.nama}
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>NIS : {tg.nis}
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>Kelas : {tg.kelas} {tg.jurusan == null ? null : tg.jurusan}
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-6">
                                            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>Rombel : {tg.rombel}
                                        </p>
                                        <Link to={`/tagihan/${tg.kode}`} className="flex ml-auto text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded w-full">Detail Tagihan</Link>
                                        <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

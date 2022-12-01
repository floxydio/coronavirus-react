import React, {useState, useEffect} from "react";
import { Container } from "../../component/Container";
import './main.css'


export default function Main() {
  const [triggerModal, setTriggerModal] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [province, setProvince] = useState([])
  const [city, setCity] = useState([])
  const [faskes, setFaskes] = useState([])



  const getProvince = async () => {
    await fetch("https://kipi.covid19.go.id/api/get-province", {
      method: 'POST',
    }).then((res) => res.json()).then((data) => {
      setProvince(data["results"])
    }).catch((err) => console.log(`Something went wrong with getProvince ${err}`))
  }

  const getCity = async(e: string) => {
    const formData = new FormData()

    formData.append("start_id", e)

    await fetch("https://kipi.covid19.go.id/api/get-city", {
      method: "POST",
      body: formData
    }).then((res) => res.json()).then((data) => {
        setCity(data["results"])
    })
  }

  const getLocate = async(province: string, city: string) => {
    await fetch(`https://kipi.covid19.go.id/api/get-faskes-vaksinasi?province=${province}&city=${city}`, {
      method : 'GET'
    }).then((res) => res.json()).then((data) => {
      setFaskes(data["data"])

    })
  }




  const handleSelected = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSelectedProvince(e.currentTarget.value)
    getCity(e.currentTarget.value)

  }

  const turnOnModal = () => {
    setTriggerModal(true)
    getLocate(selectedProvince,selectedCity)
  }

  const turnOffModal = () => {
    setTriggerModal(false)
  }


  useEffect(() => {
    getProvince()
  }, [])


  return(
    <Container marginTop="100px">
      <label htmlFor="select">Pilih Daerah</label>
      <select
        style={{
          'marginTop' : '10px',
          'width' : '300px',
          'border' : '1px solid grey',
          'borderRadius': '6px',
          'padding': '10px',
          'marginBottom' : '50px'

        }}
        value={selectedProvince}
        onChange={(e) => handleSelected(e)}
      >
        {province.map((item) => (
          <option key={item["key"]} value={item["value"]}>{item["value"]}</option>
        ))}

      </select>
      <label htmlFor="select">Pilih Kota</label>
      {selectedProvince === undefined ||  selectedProvince === "" ? <select
        style={{
          'marginTop' : '10px',
          'width' : '300px',
          'border' : '1px solid grey',
          'borderRadius': '6px',
          'padding': '10px',
          'marginBottom' :'20px'
        }}
      >
        <option value="a" disabled selected>Pilih Daerah Terlebih dahulu</option>
      </select> : <select
        style={{
          'marginTop' : '10px',
          'width' : '300px',
          'border' : '1px solid grey',
          'borderRadius': '6px',
          'padding': '10px',
          'marginBottom' :'20px'
        }}
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.currentTarget.value)

        }}
      >
        {city.map((item) => (
          <option key={item["key"]} value={item["value"]}>{item["value"]}</option>
        ))}

      </select>}

      <button className="bg-green-600 text-white p-3 rounded" onClick={turnOnModal}>Temukan Data</button>
      <div id="myModal" className={triggerModal ? "modal-on" : "modal"}>
      <div className="modal-content">
      <span className="close" onClick={turnOffModal}>&times;</span>
      {faskes.map((e) => (
        <>
          <p className="mt-5 font-medium">Nama Tempat : <span className="font-light">{e["nama"]}</span></p>
          <p className="mt-5 font-medium">Lokasi : <span className="font-light">{e["alamat"]}</span></p>
          <p className="mt-5 font-medium">No Telp : <span className="font-light">{e["telp"] }</span></p>
          ------------------------- ------------------ ------------
        </>
      ))}
  </div>

</div>
    </Container>
  )
}

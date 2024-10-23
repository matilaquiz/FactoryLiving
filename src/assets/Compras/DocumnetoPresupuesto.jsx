import React, { useContext } from 'react'
import { StyleSheet, View, Text, Page, Document, Image } from '@react-pdf/renderer'
import logo from "/src/Images/logonuevo.png"
import { Mp } from '@mui/icons-material'


const estilo = StyleSheet.create({
    pagina: {
        backgroundColor: "#fff",
        padding: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"

    },

    parrafo: {
        fontSize: "12px",
        textAlign: "justify"

    },

    imagen: {
        width: '300px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '3px',
        margin: 'auto'
    },
    section: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        flexDirection: 'column'
    },
    text: {
        fontSize: '11px',
        padding: '5px',
        textAlign: 'center'
    },
    table: {
        width: '80%',
        margin: '10rem auto',
        padding: '5px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #ccc',
        marginTop: '5px',
        padding: '10px'
    },
    header: {
        width: '20%',
        textAlign: 'center',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'royalblue'
    },
    cell: {
        width: '20%',
        textAlign: 'center',
        color: '#222'
    },
    containerText: {
        width: '400px'
    }
})

const ejemplo = {
    nombre: "matias",
    cuit: 345667,
    material: "clavo"
}


export default function DocumnetoPresupuesto({ nombre, mail, MP,tel, fecha}) {
    console.log(MP)

    return (

        <Document>
            <Page size={"A4"} style={estilo.pagina}>
                <View>
                    <Image src={logo} style={estilo.imagen}></Image>
                    <Text style={estilo.parrafo}>
                        Fecha: {fecha + "\n"}
                        {"\n"}
                        Proveedor:{nombre + "\n"}
                        {"\n"}
                        Tel:{tel + "\n"}
                        {"\n"}
                        Mail:{mail + "\n"}
                        {"\n"}


                        Buenas tardes  nos comunicamos de FactoryLving para pedirle{"\n"}
                        el presupuesto de los siguientes materiales:



                       
                    </Text>
                </View>
                <View style={estilo.table}>
                    <View style={estilo.row}>
                        <View style={estilo.header}>
                            <Text>ID</Text>
                        </View>
                        <View style={estilo.header}>
                            <Text>NOMBRE</Text>
                        </View>
                        <View style={estilo.header}>
                            <Text>CANTIDAD</Text>
                        </View>

                    </View>
                    {MP.map((material) =>
                        <View style={estilo.row}>
                            <View style={estilo.cell}>
                                <Text >
                                    {material.id}
                                </Text>
                            </View>
                            <View style={estilo.cell}>
                                <Text >
                                    {material.nombre}
                                </Text>
                            </View>
                            <View style={estilo.cell}>
                                <Text >
                                    {material.cantidad }  {(material.id==4 || material.id==5) ? "mts" : "unidades"}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>


    )
}

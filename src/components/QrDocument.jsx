import { Document, Page, View, Image, Text } from "@react-pdf/renderer";

export default function QrDocument({ deviceList = [] }) {
  return (
    <Document>
      <Page size="LETTER">
        <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", paddingVertical: 10, columnGap:-5, flexWrap: "wrap" }}>
          {deviceList.map((device, i) => (
            <View key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Text>#{device.numberCode}</Text>
              <Image
                src={device.image}
                style={{ width: 90, height: 90, margin:0, padding: 0 }}
              />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

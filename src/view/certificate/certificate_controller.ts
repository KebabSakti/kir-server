import dayjs from "dayjs";
import { Request, Response } from "express";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { Failure, NotFound } from "../../common/error";
import { kirApi } from "../../feature/loader";

export async function print(req: Request, res: Response) {
  try {
    const data = await kirApi.find(req.params.certificate);

    if (data == undefined) {
      throw new NotFound("Sertifikat tidak ditemukan");
    }

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
    });

    QRCode.toDataURL(
      `${process.env.PUB!}/certificate/${data.certificateNumber}`,
      { errorCorrectionLevel: "H", width: 500 },
      function (_, qr) {
        const fonts = {
          interRegular: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "Inter_18pt-Regular.ttf"
          ),
          interItalic: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "Inter_18pt-Italic.ttf"
          ),
          interBold: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "Inter_18pt-SemiBold.ttf"
          ),
          interBoldItalic: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "Inter_18pt-SemiBoldItalic.ttf"
          ),
          serifRegular: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "SourceSerif4_18pt-Regular.ttf"
          ),
          serifItalic: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "SourceSerif4_18pt-Italic.ttf"
          ),
          serifBold: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "SourceSerif4_18pt-SemiBold.ttf"
          ),
          serifBoldItalic: path.join(
            process.cwd(),
            `${process.env.DIR!}/font`,
            "SourceSerif4_18pt-SemiBoldItalic.ttf.ttf"
          ),
        };

        const frontPic = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.frontPic!
        );
        const backPic = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.backPic!
        );
        const rightPic = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.rightPic!
        );
        const leftPic = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.leftPic!
        );

        const directorStamp = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.directorStamp!
        );

        const directorSignature = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.directorSignature!
        );

        const inspectorStamp = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.inspectorStamp!
        );

        const inspectorSignature = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.inspectorSignature!
        );

        const agencyStamp = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.agencyStamp!
        );

        const agencySignature = path.join(
          process.cwd(),
          `${process.env.DIR!}/upload`,
          data.agencySignature!
        );

        const logo = path.join(
          process.cwd(),
          `${process.env.DIR!}/image`,
          "logo.png"
        );

        const pdf = new PDFDocument({
          size: "A4",
          margin: 0,
        });

        pdf.registerFont("Inter-Regular", fonts.interRegular);
        pdf.registerFont("Inter-Italic", fonts.interItalic);
        pdf.registerFont("Inter-Bold", fonts.interBold);
        pdf.registerFont("Inter-Bold-Italic", fonts.interBoldItalic);
        pdf.registerFont("Serif-Regular", fonts.serifRegular);
        pdf.registerFont("Serif-Italic", fonts.serifItalic);
        pdf.registerFont("Serif-Bold", fonts.serifBold);
        pdf.registerFont("Serif-Bold-Italic", fonts.serifBoldItalic);

        pdf.rect(12, 202, 289, 146).stroke();
        pdf.rect(311, 202, 272, 146).stroke();
        pdf.rect(12, 364, 571, 77).stroke();
        pdf.rect(12, 448, 289, 386).stroke();
        pdf.rect(311, 448, 272, 386).stroke();
        pdf.rect(317, 472, 260, 0).stroke();

        pdf
          .fontSize(10)
          .font("Inter-Bold")
          .text("KARTU UJI BERKALA KENDARAAN BERMOTOR", 178, 67, {
            width: 240,
            align: "center",
            underline: true,
          })
          .fontSize(8)
          .font("Inter-Bold-Italic")
          .text("VEHICLE PERIODICAL INSPECTION CARD", {
            width: 240,
            align: "center",
          })
          .fontSize(8)
          .font("Inter-Bold")
          .text("a.n, DIREKTUR JENDRAL PERHUBUNGAN DARAT", {
            width: 240,
            align: "center",
          })
          .fontSize(8)
          .font("Inter-Bold")
          .text("DIREKTUR SARANA TRANSPORTASI JALAN", {
            width: 240,
            align: "center",
            underline: true,
          })
          .fontSize(8)
          .font("Inter-Bold-Italic")
          .text("ON BEHALF OF", {
            width: 240,
            align: "center",
          })
          .fontSize(8)
          .font("Inter-Bold-Italic")
          .text("DIRECTOR GENERAL OF LAND TRANSPORTATION", {
            width: 240,
            align: "center",
          })
          .fontSize(8)
          .font("Inter-Bold-Italic")
          .text("DIRECTOR OF ROAD TRANSPORT FACILITIES", {
            width: 240,
            align: "center",
          });

        pdf
          .fontSize(8)
          .font("Serif-Bold")
          .text("Ir. Danto Restyawan, MT", 238, 166, {
            width: 120,
            align: "center",
            underline: true,
          })
          .fontSize(8)
          .font("Serif-Bold")
          .text("Pembina Utama Madya - IV/d", {
            width: 120,
            align: "center",
          })
          .fontSize(8)
          .font("Serif-Bold")
          .text("NIP 19640829 199403 1 003", {
            width: 120,
            align: "center",
          });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("TRI ADWIN CAHYONO, A.Ma.PKB", 422, 736, {
            width: 120,
            align: "center",
            underline: true,
          })
          .fontSize(6)
          .font("Serif-Bold")
          .text("Penguji Tingkat Tiga", {
            width: 120,
            align: "center",
          })
          .fontSize(6)
          .font("Serif-Bold")
          .text("NIP 065.071.PT3.01.002", {
            width: 120,
            align: "center",
          });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("AHMADY BURHAN. S.STI.,M.H.", 450, 804, {
            width: 120,
            align: "center",
            underline: true,
          })
          .fontSize(6)
          .font("Serif-Bold")
          .text("Pembina Tingkat I - IV/b", {
            width: 120,
            align: "center",
          })
          .fontSize(6)
          .font("Serif-Bold")
          .text("NIP 19800906 200012 1 001", {
            width: 120,
            align: "center",
          });

        pdf.image(logo, 278, 11, { width: 40 });

        pdf.image(directorStamp, 269, 133, { width: 57 }); //DIREKTUR
        pdf.image(directorSignature, 306, 154, { width: 30 });

        pdf.image(inspectorStamp, 450, 711, { width: 45 }); //PETUGAS
        pdf.image(inspectorSignature, 480, 725, { width: 25 });

        pdf.image(agencyStamp, 480, 779, { width: 45 }); //AGENCY
        pdf.image(agencySignature, 510, 793, { width: 25 });

        pdf.image(qr, 523, 130, { width: 60 });
        pdf.image(logo, 543, 148, { width: 20 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("IDENTITAS PEMILIK KENDARAAN BERMOTOR", 18, 208)
          .fontSize(6)
          .font("Serif-Italic")
          .text("VEHICLE OWNER IDENTIFICATIONS");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nama pemilik", 18, 230)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Owner's name");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Alamat pemilik", 18, 250)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Owner's address");

        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.owner}`, 97, 234);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.address}`, 97, 254);

        pdf
          .fontSize(8)
          .font("Serif-Bold")
          .text("IDENTITAS KENDARAAN BERMOTOR", 317, 208)
          .fontSize(6)
          .font("Serif-Italic")
          .text("VEHICLE SPECIFICATIONS");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nomor dan tanggal sertifikat registrasi uji tipe", 317, 230, {
            width: 100,
          })
          .fontSize(6)
          .font("Serif-Italic")
          .text(
            "Number and date of vehicle type approval registration certificate",
            {
              width: 110,
            }
          );

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nomor dan registrasi kendaraan", 317, 266)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Vehicle registration number");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nomor rangka kendaraan", 317, 286)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Chasis number");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nomor motor penggerak", 317, 306)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Engine number");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nomor uji kendaraan", 317, 326)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Vehicle inspection number");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${dayjs(data.created).format("DD MMM YYYY")}`, 459, 242);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.registrationNumber}`, 459, 270);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.chasisNumber}`, 459, 290, { lineBreak: false });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.engineNumber}`, 459, 310);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.inspectionNumber}`, 459, 330);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Foto Berwarna Kendaraan :", 260, 352);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Foto Depan", 132, 374, { align: "center", width: 70 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Image Front", { align: "center", width: 70 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Foto Belakang", 222.01, 374, { align: "center", width: 70 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Image Back", { align: "center", width: 70 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Foto Kanan", 312.03, 374, { align: "center", width: 70 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Image Right", { align: "center", width: 70 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Foto Kiri", 402.05, 374, { align: "center", width: 70 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Image Left", { align: "center", width: 70 });

        pdf.image(frontPic, 132, 395, { width: 70, height: 40 });
        pdf.image(backPic, 222.01, 395, { width: 70, height: 40 });
        pdf.image(rightPic, 312.03, 395, { width: 70, height: 40 });
        pdf.image(leftPic, 402.05, 395, { width: 70, height: 40 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("SPESIFIKASI TEKNIS KENDARAAN", 18, 454)
          .fontSize(6)
          .font("Serif-Italic")
          .text("VEHICLE TECHNICAL SPECIFICATIONS");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Jenis", 18, 474)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Purpose of vehicle");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Merek/tipe", 18, 492)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Brand/type");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Tahun pembuatan/perakitan", 18, 510)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Year manufactured assembled");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Bahan bakar/sumber energi", 18, 528)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Fuel/energy source");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Isi silinder", 18, 546)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Engine capacity");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Daya motor", 18, 564)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Engine power");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Ukuran ban", 18, 582)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Tyre size");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Konfigurasi sumbu", 18, 600)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Axle configuration");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Berat kosong kendaraan", 18, 618)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Curb weight");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(
            "Dimensi utama kendaraan bermotor (Vehicle main dimension)",
            18,
            636
          );

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Panjang", 18, 646)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Length");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Lebar", 18, 664)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Width");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Tinggi", 18, 682)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Height");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Julur depan", 153, 646)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Front overhang");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Julur belakang", 153, 664)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Rear overhang");

        pdf.fontSize(6).font("Serif-Bold").text("Jarak sumbu", 18, 700);
        pdf.fontSize(4).font("Serif-Italic").text("Wheel base", 54, 702.1);
        pdf.fontSize(6).font("Serif-Bold").text("Sumbu I-II", 18, 710);
        pdf.fontSize(6).font("Serif-Bold").text("Sumbu II-III", 18, 720);
        pdf.fontSize(6).font("Serif-Bold").text("Sumbu III-IV", 18, 730);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Dimensi bak muatan/tangki", 18, 740);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Dimension of cargo tub (length x width x height)", 18, 750);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("JBB/JBKB", 18, 760)
          .fontSize(6)
          .font("Serif-Italic")
          .text("GVW/GVCW");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("JBI/JBKI", 153, 760)
          .fontSize(6)
          .font("Serif-Italic")
          .text("PVW/PVCW");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Daya angkut (orang/kg)", 18, 778)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Payload (person(s)/kg(s))");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Kelas jalan terendah yang boleh dilalui", 18, 796)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Lowest road class permitted");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.vehicleType}`, 153, 478);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.vehicleBrand}`, 153, 496);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.yearManufacture}`, 153, 512);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.fuel}`, 153, 532);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.engineCapacity}`, 153, 550);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.enginePower}`, 153, 568);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.tyreSize}`, 153, 586);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.axleConfiguration}`, 153, 604);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.curbWeight}`, 153, 622);

        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.length}`, 67, 650);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.width}`, 67, 668);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.height}`, 67, 686);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.front}`, 202, 650);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.back}`, 202, 668);

        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.sumbu1}`, 153, 710);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.sumbu2}`, 153, 720);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.sumbu3}`, 153, 730);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.dimension}`, 153, 740);

        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.jbbJbkb}`, 91, 764);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.jbiJbki}`, 202, 764);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.payload}`, 153, 782);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.classPermit}`, 153, 800);

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Item uji", 317, 454)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Testing");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Ambang batas", 414, 454)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Thereshold");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Hasil uji", 528, 454)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Test result");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Rem utama", 317, 476)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Brake");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Lampu utama", 317, 537)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Headlamp");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Emisi", 317, 597)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Emission");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Keterangan", 317, 633)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Inspection result");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Masa berlaku uji berkala", 317, 653, { width: 68 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Periodical inspection expiry date", { width: 75 });

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nama petugas penguji", 317, 689, { width: 60 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Name of inspector/grade");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Tanda tangan petugas penguji", 317, 717, { width: 60 })
          .fontSize(6)
          .font("Serif-Italic")
          .text("Inspector authorization");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text("Nama unit pelaksana uji berkala kendaraan bermotor", 317, 773)
          .fontSize(6)
          .font("Serif-Italic")
          .text("Name of vehicle periodical inspection agency");

        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(
            "UNIT PELAKSANA TEKNIS DAERAH PENGUJIAN DINAS PERHUBUNGAN KOTA TARAKAN",
            317,
            793,
            { width: 140 }
          );

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text(
            "Total gaya pengereman >= 50% X total berat sumbu (kg)",
            414,
            476,
            { width: 90 }
          );

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text(
            "Selisih gaya pengereman roda kiri dan roda kanan dalam satu sumbu maksimum 8%",
            414,
            505,
            { width: 95 }
          );

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text(
            "Kekuatan pancar lampu utama kanan 12000 cd (lampu jauh)",
            414,
            537,
            { width: 95 }
          );

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text(
            "Kekuatan pancar lampu utama kiri 12000 cd (lampu jauh)",
            414,
            557,
            { width: 95 }
          );

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text("Penyimpangan ke kanan 0° 34 (lampu jauh)", 414, 577, {
            width: 95,
          });

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text("Bahan bakar solar tahun pembuatan >= 2010", 414, 597, {
            width: 95,
          });

        pdf
          .fontSize(6)
          .font("Serif-Italic")
          .text("Opasitas : 27.0% HSU", 414, 617, { width: 95 });

        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.brake1}`, 528, 480);
        pdf.fontSize(6).font("Serif-Bold").text("I", 528, 501);
        pdf.fontSize(6).font("Serif-Bold").text("II", 528, 509);
        pdf.fontSize(6).font("Serif-Bold").text("III", 528, 517);
        pdf.fontSize(6).font("Serif-Bold").text("IV", 528, 525);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.brake2}`, 541, 501);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.brake3}`, 541, 509);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.brake4}`, 541, 517);
        pdf.fontSize(6).font("Serif-Bold").text(`: ${data.brake5}`, 541, 525);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.headLamp1}`, 528, 541);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.headLamp2}`, 528, 561);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.headLamp3}`, 528, 581);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.inspectionResult}`, 414, 637);
        pdf.fontSize(6).font("Serif-Bold").text(": 12 JUL 2024", 414, 665);
        pdf
          .fontSize(6)
          .font("Serif-Bold")
          .text(`: ${data.inspector}`, 414, 697);
        pdf.fontSize(6).font("Serif-Bold").text(":", 414, 725);

        pdf.end();

        pdf.on("data", (chunk) => {
          stream.write(chunk);
        });

        pdf.on("end", () => {
          stream.end();
        });
      }
    );
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function find(req: Request, res: Response) {
  try {
    const data = await kirApi.find(req.params.certificate);

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}

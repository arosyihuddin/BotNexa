import { QRCodeSVG } from 'qrcode.react';

export function QREncoder({ qrData }: { qrData: string }) {
    if (!qrData) return null;

    return (
        <div className="p-4">
            <QRCodeSVG value={qrData} size={256} />
        </div>
    );
}

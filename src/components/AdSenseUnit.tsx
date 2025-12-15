'use client'
import { useEffect } from 'react'

export default function AdSenseUnit({ slotId }: { slotId: string }) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error', e);
        }
    }, []);

    return (
        <div className="my-8 text-center min-h-[100px] bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Advertisement</span>
            <div className="w-full flex justify-center overflow-hidden">
                <ins className="adsbygoogle"
                    style={{ display: 'block', minWidth: '300px', width: '100%' }}
                    data-ad-client="ca-pub-2499950673294937"
                    data-ad-slot={slotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true">
                </ins>
            </div>
        </div>
    )
}

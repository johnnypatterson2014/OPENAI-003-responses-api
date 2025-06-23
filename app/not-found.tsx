'use client';

export default function NotFound() {
    return (
        <>
            <div className="flex main-content-wrapper h-full w-full">
                <div className='flex-1'>
                    <h1 className="fesk-header-h1">
                        404
                    </h1>
                    <div className="inline-block">
                        <h2 className="fesk-header-h2">This page could not be found.</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

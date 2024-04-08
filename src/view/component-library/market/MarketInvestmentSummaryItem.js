import React, { useCallback, useState } from 'react';
import './MarketInvestmentSummaryItem.scss';
import FileUploader from 'view/component-library/input/FileUploader';
import { IMAGE_TYPES } from 'view/assets/constant';
import uploadFileIcon from 'view/assets/image/upload-file-padding.png';
import SpaceComponent from 'view/component-library/space/SpaceComponent';
import Button from '../../component-library/button/Button';

function MarketInvestmentSummaryItem({
    marketInvestmentSummary,
    setMarketInvestmentSummary,
    isEditable,
}) {
    const [preview, setPreview] = useState(
        marketInvestmentSummary?.summaryImageUri,
    );

    const addNewImage = useCallback(
        async file => {
            setMarketInvestmentSummary({
                ...marketInvestmentSummary,
                summaryImage: file,
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        },
        [setMarketInvestmentSummary, marketInvestmentSummary],
    );

    return (
        <div className="market-investment-summary">
            {!isEditable && (
                <div className="market-investment-summary-row">
                    <img
                        className="market-investment-summary-image-upload"
                        src={marketInvestmentSummary?.summaryImageUri}
                        alt=""
                    />
                    <input
                        className="market-investment-summary-text"
                        value={marketInvestmentSummary?.summaryText}
                        disabled
                    />
                </div>
            )}
            {isEditable && (
                <div className="market-investment-summary-row">
                    <FileUploader
                        key={'image'}
                        types={IMAGE_TYPES}
                        onLoadFile={addNewImage}>
                        <img
                            className="market-investment-summary-image-upload"
                            src={preview ?? uploadFileIcon}
                            alt=""
                        />
                    </FileUploader>
                    <input
                        className="market-investment-summary-text"
                        value={marketInvestmentSummary?.summaryText}
                        onChange={e =>
                            setMarketInvestmentSummary({
                                ...marketInvestmentSummary,
                                summaryText: e.target.value,
                            })
                        }
                    />
                    <SpaceComponent width={16} />
                    <Button
                        className="error"
                        onClick={() => setMarketInvestmentSummary(undefined)}>
                        delete
                    </Button>
                </div>
            )}
        </div>
    );
}

export default MarketInvestmentSummaryItem;

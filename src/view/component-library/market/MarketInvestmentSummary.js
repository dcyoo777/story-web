import React, { useEffect, useState } from 'react';
import './MarketInvestmentSummary.scss';
import MarketInvestmentSummaryItem from './MarketInvestmentSummaryItem';
import classNames from 'classnames';
import Button from '../../component-library/button/Button';
import ButtonWrapper from '../ButtonWrapper';

function MarketInvestmentSummary({
    marketInvestmentSummaries,
    setMarketInvestmentSummaries,
    isEditable,
}) {
    return (
        <div id="MarketInvestmentSummary">
            <div className="title">투자 포인트 요약</div>
            {marketInvestmentSummaries.map((marketInvestmentSummary, i) => (
                <MarketInvestmentSummaryItem
                    marketInvestmentSummary={marketInvestmentSummary}
                    setMarketInvestmentSummary={item => {
                        setMarketInvestmentSummaries(prev => {
                            if (item) {
                                return prev.map((el, j) => {
                                    if (i === j) {
                                        return item;
                                    }
                                    return el;
                                });
                            }
                            return prev.filter((el, j) => i !== j);
                        });
                    }}
                    isEditable={isEditable}
                />
            ))}

            {isEditable && (
                <ButtonWrapper>
                    <Button
                        className={'secondary'}
                        onClick={() =>
                            setMarketInvestmentSummaries(prev => {
                                if (prev.length === 0) {
                                    return [{}];
                                }
                                return prev.concat([{}]);
                            })
                        }>
                        Add
                    </Button>
                </ButtonWrapper>
            )}
        </div>
    );
}

export default MarketInvestmentSummary;

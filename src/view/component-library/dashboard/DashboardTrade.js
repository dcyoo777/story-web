import { useCallback, useEffect, useState } from 'react';
import { DashBoardAbstractContainer } from '../../page/Dashboard';
import DashboardTradeIcon from '../../assets/image/dashboard-trade.png';
import useInit from '../../../hooks/useInit';
import { actionHandler } from '../../../action/util/parseAction';
import { getMarketsAction } from '../../../action/marketAction';
import { getChartHistoriesAction } from '../../../action/chartAction';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import './DashboardTrade.scss';
import { addComma } from '../../../utils/commonUtils';
import Select from '../../component-library/input/Select';

function DashboardTrade() {
    const [selectedMarketToken, setSelectedMarketToken] = useState({
        pairId: null,
        marketName: '',
    });
    const [allMarkets, setAllMarkets] = useState([]);

    const [chartHistory, setChartHistory] = useState([]);

    const [activeBar, setActiveBar] = useState(null);

    // const chartStatus = useMemo(() => {
    //     if (selectedMarketToken.pairId !== null && chartHistory.length !== 0) {
    //         return 'FILL';
    //     }
    //     if (selectedMarketToken.pairId !== null && chartHistory.length === 0) {
    //         return 'EMPTY';
    //     }
    //     return 'INVALID';
    // }, [selectedMarketToken, chartHistory]);

    const getPairTradeHistory = async (pairId, date = 6) => {
        actionHandler(getChartHistoriesAction({ pairId, date }), result => {
            setChartHistory(result);
        });
    };

    useEffect(() => {
        if (allMarkets.length !== 0) {
            setSelectedMarketToken({
                pairId: allMarkets[0].pairId,
                marketName: allMarkets[0].name,
            });
        }
    }, [allMarkets]);

    useEffect(() => {
        if (selectedMarketToken.pairId) {
            getPairTradeHistory(selectedMarketToken.pairId);
        }
    }, [selectedMarketToken]);

    useInit(
        useCallback(async () => {
            actionHandler(
                getMarketsAction({ isCount: true, limit: 10 }),
                result => {
                    setAllMarkets(result.list);
                },
            );
        }, []),
    );

    return (
        <DashBoardAbstractContainer
            title={'거래 대금 (최근 일주일)'}
            icon={DashboardTradeIcon}
            headerOption={
                <PairSelector
                    allMarkets={allMarkets}
                    setSelectedMarketToken={setSelectedMarketToken}
                />
            }>
            {chartHistory.length !== 0 ? (
                <div style={{ width: '100%', height: 217 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartHistory}
                            margin={{
                                top: 20,
                                left: 25,
                            }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={'#d8d9d9'}
                                vertical={false}
                            />
                            <XAxis
                                dataKey="date"
                                axisLine={{ stroke: '#d8d9d9' }}
                                tickLine={{ stroke: '#d8d9d9' }}
                            />
                            <YAxis
                                tickFormatter={tick => `${addComma(tick)}`}
                                dataKey="transactionAmount"
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                wrapperStyle={{ outline: 'none' }}
                                content={<CustomToolTip />}
                                cursor={{ fill: 'none', strokeWidth: 1 }}
                            />
                            <Bar
                                onMouseOver={(data, index, event) =>
                                    setActiveBar(index)
                                }
                                onMouseLeave={(data, index, event) =>
                                    setActiveBar(null)
                                }
                                maxBarSize={30}
                                radius={[16, 16, 0, 0]}
                                dataKey="transactionAmount">
                                {chartHistory.map((entry, index) => (
                                    <Cell
                                        cursor="pointer"
                                        fill={
                                            index === activeBar
                                                ? '#3860E2'
                                                : '#C7E2FF'
                                        }
                                        key={`cell-${index}`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="no-trade-history">
                    거래 내역이 존재하지 않습니다.
                </div>
            )}
        </DashBoardAbstractContainer>
    );
}

export default DashboardTrade;

export const CustomToolTip = props => {
    const { payload } = props;
    return payload && payload[0]?.payload?.transactionAmount ? (
        <div className="custom-tooltip">
            {addComma(payload[0]?.payload?.transactionAmount)}
        </div>
    ) : (
        <></>
    );
};

export const PairSelector = ({ allMarkets, setSelectedMarketToken }) => {
    return (
        <Select
            disabled={allMarkets.length === 0}
            className={'pair-select'}
            onChange={e => {
                const selectedMarketPair = allMarkets.find(
                    el => el.pairId === Number(e.target.value),
                );
                setSelectedMarketToken({
                    pairId: Number(e.target.value),
                    marketName: selectedMarketPair.name,
                });
            }}
            options={allMarkets}
            valueKey={'pairId'}
            labelKey={'name'}
        />
    );
};

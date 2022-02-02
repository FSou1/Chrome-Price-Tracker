import { useState } from 'react';
import useInterval from 'use-interval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { checkAmazon } from '../utils/amazon';
import './Watcher.css';

function Watcher({ task, onPriceChanged, onStart, onStop, onError }) {
    const [status, setStatus] = useState('Idle');
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(NaN);

    const execute = () => {
        if (task.state === 'stopped') {
            setStatus('Stopped');
            return;
        }

        setStatus('Checking');

        checkAmazon(task.asin)
            .then((data) => {
                if (price !== data.price) {
                    setPrice(data.price);
                    onPriceChanged({
                        title: data.title,
                        price: data.price
                    });
                }

                setTitle(data.title);
                setStatus('Checked (' + new Date().toLocaleTimeString() + ')');
            }, () => {
                onError({
                    asin: task.asin,
                    title: title
                });
            });
    }

    const start = () => onStart({ asin: task.asin });

    const stop = () => onStop({ asin: task.asin });

    useInterval(() => execute(), task.interval, true);

    return (
        <div className={"row " + (task.state === 'stopped' ? "inactive" : "")}>
            <div>
                {
                    task.state === 'stopped'
                        ? <FontAwesomeIcon icon={faPlayCircle} className="start" onClick={start} />
                        : <FontAwesomeIcon icon={faPauseCircle} className="stop" onClick={stop} />
                }
            </div>
            <div className="wd-500 truncate">
                <a href={`https://www.amazon.com/dp/${task.asin}/?aod=1`} target="_blank" rel="noreferrer">
                    {title ? title : task.asin}
                </a>
            </div>
            <div className="wd-100">
                <span className={price > 0 ? 'available' : 'unavailable'}>
                    {Number.isNaN(price) ? 'Unavailable' : '$' + price}
                </span>
            </div>
            <div className="wd-200">
                {status}
            </div>
            <div className="wd-100">
                {task.errorCount} errors
            </div>
        </div>
    )
}

export default Watcher;
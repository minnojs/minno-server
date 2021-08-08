export default function formatDate(date_str){
    return `${date_str.substr(4, 2)}/${date_str.substr(6, 2)}/${date_str.substr(0, 4)} ${date_str.substr(9, 2)}:${date_str.substr(11, 2)}:${date_str.substr(13, 2)}`;
}

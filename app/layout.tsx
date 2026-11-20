import './style.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Ηλεκτρικές Μηχανές | Εργαστήριο',description:'Διαδραστική μελέτη ασύγχρονου κινητήρα'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="el"><body>{children}</body></html>}

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/home';
// import { getComics } from '../utils/api';
// import { Comic } from '../interfaces';

// vi.mock('../utils/api', () => ({
//   getComics: vi.fn(),
// }));

// const mockComics: Comic[] = [
//   { uid: '1', title: 'Comic 1', thumbnail: 'url1' },
//   { uid: '2', title: 'Comic 2', thumbnail: 'url2' },
// ];

// describe('Home Component', () => {
//   beforeEach(() => {
//     (getComics as vi.Mock).mockResolvedValue({ comics: mockComics });
//   });

//   test('renders without crashing', () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('Star★Comics')).toBeInTheDocument();
//   });

//   test('displays loading spinner when fetching data', async () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );
//     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
//     expect(screen.getByRole('progressbar')).toBeInTheDocument();
//     await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
//   });

//   test('fetches and displays comics on search', async () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );
//     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
//     await waitFor(() => expect(getComics).toHaveBeenCalledWith('test'));
//     expect(screen.getByText('Comic 1')).toBeInTheDocument();
//     expect(screen.getByText('Comic 2')).toBeInTheDocument();
//   });

//   test('handles pagination correctly', async () => {
//     const longMockComics = Array.from({ length: 15 }, (_, i) => ({
//       uid: `${i + 1}`,
//       title: `Comic ${i + 1}`,
//       thumbnail: `url${i + 1}`,
//     }));

//     (getComics as vi.Mock).mockResolvedValueOnce({ comics: longMockComics });

//     render(
//       <MemoryRouter initialEntries={['/?page=1']}>
//         <Home />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
//     await waitFor(() => expect(screen.getByText('Comic 1')).toBeInTheDocument());
//     fireEvent.click(screen.getByText('2'));
//     expect(screen.getByText('Comic 11')).toBeInTheDocument();
//   });

//   test('navigates to detailed view on card click', async () => {
//     render(
//       <MemoryRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/detailed/:uid" element={<div>Detailed View</div>} />
//         </Routes>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
//     await waitFor(() => expect(screen.getByText('Comic 1')).toBeInTheDocument());
//     fireEvent.click(screen.getByText('Comic 1'));
//     expect(screen.getByText('Detailed View')).toBeInTheDocument();
//   });
// });
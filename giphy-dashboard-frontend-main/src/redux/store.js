import api from './api';
import app from '@/redux/app/reducers';
import csv from '@/redux/csv/reducers';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
	reducer: { app, csv, [api.reducerPath]: api.reducer },
	middleware: defaults => [...defaults(), api.middleware],
});

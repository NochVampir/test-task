export interface AppealInterface {
    id?: string;
    title: string;
    description: string;
    status?: AppealStatus;
    resolution?: string;
    cancellationReason?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateAppealInterface {
    id?: string;
    title?: string;
    description?: string;
    status: AppealStatus;
    createdAt?: Date;
    updatedAt?: Date;
    [key: string]: any;
}

export interface updateAppeal {
    
}


export enum AppealStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
} 
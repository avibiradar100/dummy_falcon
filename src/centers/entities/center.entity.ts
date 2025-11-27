import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('centers')
export class Center {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'center_id', unique: true })
  @Index()
  centerId: string;

  @Column({ name: 'center_name' })
  centerName: string;

  @Column({ name: 'center_tel_no' })
  centerTelNo: string;

  @Column({ name: 'center_zip_code' })
  centerZipCode: string;

  @Column({ name: 'center_address1' })
  centerAddress1: string;

  @Column({ name: 'center_address2' })
  centerAddress2: string;

  @Column({ name: 'center_address3' })
  centerAddress3: string;

  @Column({ name: 'timezone' })
  timezone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

'use client'

import QRCanvas from '@/components/QRCanvas'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'
import { File } from 'buffer'

const formSchema = z.object({
    text: z.string(),
    size: z.number().min(8).max(40).default(8),
    effectType: z.enum([`round`, `fusion`, `spot`, 'none']),
    effectValue: z.number().min(0).max(100),
    logo: z.string().optional(),
})

function QrMaker() {
    const [logo, setLogo] = useState<File | null>(null)
    const logoInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: '',
            size: 8,
            effectType: 'none',
            effectValue: 100,
        },
    })

    return (
        <div className="flex space-x-4 container">
            <div className="w-1/2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        max={40}
                                        min={8}
                                        step={1}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <EffectFormRadioGroupItem value="none" />
                                        <EffectFormRadioGroupItem value="round" />
                                        <EffectFormRadioGroupItem value="fusion" />
                                        <EffectFormRadioGroupItem value="spot" />
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        max={100}
                                        step={1}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                {form.watch('logo') && (
                                    <p>{form.getValues('logo')}</p>
                                )}
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>
            <div className="w-1/2">
                <QRCanvas
                    options={{
                        cellSize: form.watch('size') || 16,
                        data: form.watch('text'),
                        size: form.watch('size') || 16,
                        effect: {
                            type: form.watch('effectType') || 'none',
                            value: form.watch('effectValue') / 100,
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default QrMaker

function EffectFormRadioGroupItem({ value }: { value: string }) {
    return (
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={value} />
            </FormControl>
            <FormLabel className="font-normal capitalize">{value}</FormLabel>
        </FormItem>
    )
}
